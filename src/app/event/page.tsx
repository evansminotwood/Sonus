"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock playlist data
const initialPlaylist = [
  { id: "1", title: "Blinding Lights", artist: "The Weeknd", votes: 12, duration: "3:20", albumArt: "https://via.placeholder.com/48" },
  { id: "2", title: "Levitating", artist: "Dua Lipa", votes: 9, duration: "3:23", albumArt: "https://via.placeholder.com/48" },
  { id: "3", title: "Good 4 U", artist: "Olivia Rodrigo", votes: 8, duration: "2:58", albumArt: "https://via.placeholder.com/48" },
  { id: "4", title: "Stay", artist: "The Kid LAROI, Justin Bieber", votes: 7, duration: "2:21", albumArt: "https://via.placeholder.com/48" },
  { id: "5", title: "Peaches", artist: "Justin Bieber", votes: 6, duration: "3:18", albumArt: "https://via.placeholder.com/48" },
  { id: "6", title: "Kiss Me More", artist: "Doja Cat ft. SZA", votes: 5, duration: "3:28", albumArt: "https://via.placeholder.com/48" },
  { id: "7", title: "Montero", artist: "Lil Nas X", votes: 4, duration: "2:17", albumArt: "https://via.placeholder.com/48" },
  { id: "8", title: "drivers license", artist: "Olivia Rodrigo", votes: 3, duration: "4:02", albumArt: "https://via.placeholder.com/48" },
];

// Mock search results
const mockSearchResults = [
  { id: "s1", title: "Shape of You", artist: "Ed Sheeran", duration: "3:53" },
  { id: "s2", title: "Shake It Off", artist: "Taylor Swift", duration: "3:39" },
  { id: "s3", title: "Shallow", artist: "Lady Gaga, Bradley Cooper", duration: "3:35" },
  { id: "s4", title: "Shivers", artist: "Ed Sheeran", duration: "3:27" },
];

export default function EventPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [playlist, setPlaylist] = useState(initialPlaylist);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const handleVote = (songId: string) => {
    setPlaylist((prev) =>
      prev
        .map((song) =>
          song.id === songId ? { ...song, votes: song.votes + 1 } : song
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  const handleAddSong = (song: { id: string; title: string; artist: string; duration: string }) => {
    const newSong = {
      ...song,
      id: `new-${Date.now()}`,
      votes: 1,
      albumArt: "https://via.placeholder.com/48",
    };
    setPlaylist((prev) => [...prev, newSong].sort((a, b) => b.votes - a.votes));
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Event Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Summer BBQ Party</h1>
              <Badge variant="default">Live</Badge>
            </div>
            <p className="mt-1 text-muted-foreground">
              Hosted by John Doe - 24 guests connected
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share Event
            </Button>
            <Button variant="outline">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Open in Spotify
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Search and Add Songs */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add a Song</CardTitle>
              <CardDescription>
                Search for songs to add to the playlist.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  type="search"
                  placeholder="Search for a song..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

              {/* Search Results */}
              {showResults && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Search Results</p>
                  {mockSearchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                          <svg
                            className="h-5 w-5 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{result.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {result.artist}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAddSong(result)}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Now Playing */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium">Now Playing</p>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                        <svg
                          className="h-8 w-8 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                          />
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <svg
                          className="h-3 w-3 text-primary-foreground"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Blinding Lights</p>
                      <p className="text-sm text-muted-foreground">The Weeknd</p>
                      <div className="mt-2 h-1 w-full rounded-full bg-muted">
                        <div className="h-1 w-1/3 rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Playlist */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Playlist Queue</CardTitle>
                  <CardDescription>
                    Vote for songs to move them up the queue.
                  </CardDescription>
                </div>
                <Badge variant="secondary">{playlist.length} songs</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-2">
                  {playlist.map((song, index) => (
                    <div
                      key={song.id}
                      className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center text-lg font-medium text-muted-foreground">
                        {index + 1}
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                        <svg
                          className="h-6 w-6 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {song.artist}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {song.duration}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleVote(song.id)}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                        {song.votes}
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
