import { useState, useEffect } from "react";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string;
const USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string;

const REST_HEADERS = {
  Authorization: `token ${TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
  visibility: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommitsThisYear: number;
  followers: number;
  following: number;
  avatarUrl: string;
  bio: string | null;
  location: string | null;
  name: string | null;
  login: string;
}

export interface GitHubData {
  repos: Repo[];
  stats: GitHubStats;
  contributionWeeks: ContributionWeek[];
  loading: boolean;
  error: string | null;
}

async function fetchAllRepos(): Promise<Repo[]> {
  const repos: Repo[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `https://api.github.com/user/repos?per_page=100&page=${page}&type=owner&sort=updated`,
      { headers: REST_HEADERS }
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data: Repo[] = await res.json();
    if (data.length === 0) break;
    repos.push(...data);
    page++;
    if (data.length < 100) break;
  }
  return repos;
}

async function fetchUserProfile() {
  const res = await fetch(`https://api.github.com/user`, {
    headers: REST_HEADERS,
  });
  if (!res.ok) throw new Error(`GitHub user API error: ${res.status}`);
  return res.json();
}

const CONTRIBUTION_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}
`;

async function fetchContributions(): Promise<{
  weeks: ContributionWeek[];
  totalCommits: number;
}> {
  const now = new Date();
  const from = new Date(now);
  from.setFullYear(now.getFullYear() - 1);

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: {
        username: USERNAME,
        from: from.toISOString(),
        to: now.toISOString(),
      },
    }),
  });

  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "GraphQL error");
  }

  const collection = json.data?.user?.contributionsCollection;
  return {
    weeks: collection?.contributionCalendar?.weeks ?? [],
    totalCommits: collection?.totalCommitContributions ?? 0,
  };
}

export function useGitHub(): GitHubData {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    totalCommitsThisYear: 0,
    followers: 0,
    following: 0,
    avatarUrl: "",
    bio: null,
    location: null,
    name: null,
    login: USERNAME,
  });
  const [contributionWeeks, setContributionWeeks] = useState<ContributionWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [allRepos, userProfile, contributions] = await Promise.all([
          fetchAllRepos(),
          fetchUserProfile(),
          fetchContributions(),
        ]);

        if (cancelled) return;

        const ownedRepos = allRepos.filter((r) => !r.fork);
        const totalStars = ownedRepos.reduce(
          (acc, r) => acc + r.stargazers_count,
          0
        );
        const totalForks = ownedRepos.reduce(
          (acc, r) => acc + r.forks_count,
          0
        );

        setRepos(ownedRepos);
        setStats({
          totalRepos: userProfile.public_repos,
          totalStars,
          totalForks,
          totalCommitsThisYear: contributions.totalCommits,
          followers: userProfile.followers,
          following: userProfile.following,
          avatarUrl: userProfile.avatar_url,
          bio: userProfile.bio,
          location: userProfile.location,
          name: userProfile.name,
          login: userProfile.login,
        });
        setContributionWeeks(contributions.weeks);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { repos, stats, contributionWeeks, loading, error };
}
