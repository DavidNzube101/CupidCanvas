"use client"

import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Heart, Download, ArrowRight, ArrowLeft } from "lucide-react"

interface FormData {
  name: string
  message: string
  style: string
  image?: string
}

export function ValentineForm() {
  const [api, setApi] = useState<any>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    message: "",
    style: "cute",
  })
  const resultRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    api?.scrollNext()
    setCurrentSlide((prev) => prev + 1)
  }

  const handlePrev = () => {
    api?.scrollPrev()
    setCurrentSlide((prev) => prev - 1)
  }

  const saveAsImage = async () => {
    if (resultRef.current) {
      try {
        const dataUrl = await toPng(resultRef.current, { quality: 0.95 })
        const link = document.createElement("a")
        link.download = "valentine-card.png"
        link.href = dataUrl
        link.click()
      } catch (err) {
        console.error("Error saving image:", err)
      }
    }
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <Card className="w-full max-w-xl bg-white/80 backdrop-blur-sm">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: false,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <div className="mb-6">
                <div className="relative">
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-4 m-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-pink-100 flex-shrink-0">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-red-500/10" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">Sorry! Not Available 💔</h3>
                      <p className="text-sm text-red-500">This cutie is already taken! Keep looking!</p>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full m-1">Taken!</span>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-pink-600 text-center">Who's Your Valentine? 💝</h2>
                <div className="space-y-2">
                  <Label htmlFor="name">Their Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter their name..."
                  />
                </div>
                <Button onClick={handleNext} className="w-full bg-pink-600 hover:bg-pink-700" disabled={!formData.name}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-pink-600 text-center">Choose Your Style 💌</h2>
                <RadioGroup
                  value={formData.style}
                  onValueChange={(value) => setFormData({ ...formData, style: value })}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="cute" id="cute" className="peer sr-only" />
                    <Label
                      htmlFor="cute"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-pink-600 [&:has([data-state=checked])]:border-pink-600"
                    >
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C3gBYkuGX4tFvwFEBTSnrQ1PLHFCFz.png"
                        alt="Cute style"
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      Cute
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="folk" id="folk" className="peer sr-only" />
                    <Label
                      htmlFor="folk"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-pink-600 [&:has([data-state=checked])]:border-pink-600"
                    >
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W5431nlbv7hCtrjir7VNOjkCTwVJZl.png"
                        alt="Folk style"
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      Folk Art
                    </Label>
                  </div>
                </RadioGroup>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="image">Add Their Photo (Optional)</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setFormData({ ...formData, image: reader.result as string })
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handlePrev} variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} className="w-full bg-pink-600 hover:bg-pink-700">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-pink-600 text-center">Write Your Message 💕</h2>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Valentine Message</Label>
                  <Input
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write something sweet..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handlePrev} variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                    disabled={!formData.message}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="p-6 space-y-4">
                <div ref={resultRef} className="p-6 bg-gradient-to-r from-pink-100 to-red-100 rounded-lg">
                  <div className="text-center space-y-4">
                    <Heart className="w-12 h-12 text-pink-600 mx-auto animate-pulse" />
                    {formData.image && (
                      <div className="relative w-32 h-32 mx-auto">
                        <img
                          src={formData.image || "/placeholder.svg"}
                          alt="Valentine"
                          className="w-full h-full object-cover rounded-full border-4 border-pink-200 shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-full bg-pink-500/10" />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-pink-600">Dear {formData.name},</h2>
                    <p className="text-lg text-gray-700">{formData.message}</p>
                    <div className="pt-4">
                      <img
                        src={
                          formData.style === "cute"
                            ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C3gBYkuGX4tFvwFEBTSnrQ1PLHFCFz.png"
                            : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W5431nlbv7hCtrjir7VNOjkCTwVJZl.png"
                        }
                        alt="Valentine decoration"
                        className="w-32 h-32 object-cover mx-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handlePrev} variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={saveAsImage} className="w-full bg-pink-600 hover:bg-pink-700">
                    Save as Image <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Card>
    </div>
  )
}

