import {
  Linkedin,
  Github,
  Mail,
  ChevronLeft, 
  ChevronRight
} from "lucide-react"

import { SiDiscord } from "react-icons/si"

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "../components/Tooltip"

import profile from "../assets/mypic.jpg"
import logo from "../assets/logo_w.png"

function Heading() {
  return (
    <section className="min-h-screen flex items-center relative z-10 px-6">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT COLUMN */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            Carol Meng
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
            Software Engineering Student @ UWaterloo
          </p>

          <TooltipProvider delayDuration={150}>
            <div className="flex items-center gap-5 mt-6 text-2xl text-muted-foreground">

              <a
                href="https://www.linkedin.com/in/carol-meng-1608a32b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Linkedin />
              </a>

              <a
                href="https://github.com/lslr6302"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Github />
              </a>

              {/* Discord */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="hover:text-[#5865F2] transition-colors">
                    <SiDiscord />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  loracmmm
                </TooltipContent>
              </Tooltip>

              {/* Email */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="mailto:c35meng@uwaterloo.ca"
                    className="hover:text-primary transition-colors"
                  >
                    <Mail />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  c35meng@uwaterloo.ca
                </TooltipContent>
              </Tooltip>

            </div>
          </TooltipProvider>

            {/* Community Row */}
            <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground mt-6">

            <span className="text-muted-foreground">
                check out this cool site:
            </span>

            {/* Previous Person */}
            <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
            >
                <ChevronLeft size={18} />
            </a>

            {/* Community Logo */}
            <a
                href="https://se-webring.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
            >
                <img
                src={logo}
                alt="SE Webring Logo"
                className="w-6 h-6 object-contain"
                />
            </a>

            {/* Next Person */}
            <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
            >
                <ChevronRight size={18} />
            </a>

            </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex justify-center md:justify-end md:-translate-x-10">
          <div className="relative group">
            <img
              src={profile}
              alt="picture of me in the snow"
              className="w-72 md:w-96 h-auto object-contain rounded-2xl border border-border shadow-2xl"
            />

            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Heading
