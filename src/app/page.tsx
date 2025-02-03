import { EmojiBackground } from "@/components/emoji-background"
import { ValentineForm } from "@/components/valentine-form"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-pink-200">
      <EmojiBackground />
      <ValentineForm />
    </main>
  )
}

