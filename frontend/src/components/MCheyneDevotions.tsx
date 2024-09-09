"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, ChevronLeft, ChevronRight, Calendar, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock Bible chapters for demonstration
const bibleChapters = [
  { id: 1, title: "Genesis 1", content: "In the beginning God created the heavens and the earth..." },
  { id: 2, title: "Ezra 1", content: "In the first year of Cyrus king of Persia..." },
  { id: 3, title: "Matthew 1", content: "The book of the genealogy of Jesus Christ..." },
  { id: 4, title: "Acts 1", content: "The former account I made, O Theophilus..." },
];

export default function ElegantDailyDevotions() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [expandReadings, setExpandReadings] = useState(false);
  const [readChapters, setReadChapters] = useState<number[]>([]);

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addListener(handleSystemThemeChange);

    if (theme === "system") {
      setTheme(mediaQuery.matches ? "dark" : "light");
    }

    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const markAsRead = (chapterId: number) => {
    setReadChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const navigateDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors duration-200">
      <nav className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gradient">Daily Devotions</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-primary-foreground hover:bg-primary/90"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/90">Login</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover text-popover-foreground">
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-foreground dark:text-foreground-dark">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Preferences</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-background dark:bg-background-dark">
                    <DialogHeader>
                      <DialogTitle className="text-foreground dark:text-foreground-dark">Preferences</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="expand-readings" className="text-foreground dark:text-foreground-dark">
                          Expand readings on launch
                        </Label>
                        <Switch
                          id="expand-readings"
                          checked={expandReadings}
                          onCheckedChange={setExpandReadings}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="theme-select" className="text-foreground dark:text-foreground-dark">Theme</Label>
                        <Select
                          value={theme}
                          onValueChange={(value: "light" | "dark" | "system") => setTheme(value)}
                        >
                          <SelectTrigger className="w-[180px] bg-background dark:bg-background-dark">
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                          <SelectContent className="bg-background dark:bg-background-dark">
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4">
        <Card className="mb-6 bg-card text-card-foreground shadow-lg card-hover">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate(-1)}
                className="text-foreground dark:text-foreground-dark hover:bg-muted"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-semibold text-foreground dark:text-foreground-dark">
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateDate(1)}
                className="text-foreground dark:text-foreground-dark hover:bg-muted"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="text-foreground dark:text-foreground-dark hover:bg-muted">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover text-popover-foreground">
                  <CalendarComponent
                    mode="single"
                    selected={currentDate}
                    onSelect={(date) => date && setCurrentDate(date)}
                    initialFocus
                    className="text-foreground dark:text-foreground-dark"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {bibleChapters.map((chapter) => (
            <Card
              key={chapter.id}
              className="overflow-hidden bg-card text-card-foreground shadow-md card-hover"
            >
              <Collapsible defaultOpen={expandReadings}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground-dark">
                    {chapter.title}
                  </CardTitle>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-foreground dark:text-foreground-dark hover:bg-muted">
                      Toggle
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <p className="mt-2 text-muted-foreground dark:text-muted-foreground verse-text">
                      {chapter.content}
                    </p>
                    <Button
                      className="mt-4"
                      variant={readChapters.includes(chapter.id) ? "secondary" : "default"}
                      onClick={() => markAsRead(chapter.id)}
                    >
                      {readChapters.includes(chapter.id) ? "Mark as Unread" : "Mark as Read"}
                    </Button>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground p-6 mt-8">
        <div className="container mx-auto text-center">
          <p className="font-semibold">
            Daily Devotions based on the M'Cheyne Bible reading plan
          </p>
          <p className="text-sm mt-2 text-primary-foreground/80">
            © {new Date().getFullYear()} Your Organization. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}