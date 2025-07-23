import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import api from "../lib/axios"
import { toast } from "./ui/use-toast"

interface ComposePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export function ComposePostDialog({ isOpen, onClose, onPostCreated }: ComposePostDialogProps) {
  const [content, setContent] = useState("")
  const [platform, setPlatform] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await api.post("/api/posts", { content, platform, scheduledAt })
      toast({
        title: "Post Scheduled!",
        description: "Your post has been successfully scheduled.",
      })
      onPostCreated()
      onClose()
      setContent("")
      setPlatform("")
      setScheduledAt("")
    } catch (error) {
      toast({
        title: "Failed to Schedule Post",
        description: "There was an error scheduling your post. Please try again.",
        variant: "destructive",
      })
      console.error("Error scheduling post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compose New Post</DialogTitle>
          <DialogDescription>
            Write your social media post and schedule it for later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                Platform
              </Label>
              <Select onValueChange={setPlatform} value={platform}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="scheduledAt" className="text-right">
                Schedule At
              </Label>
              <Input
                id="scheduledAt"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Scheduling..." : "Schedule Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
