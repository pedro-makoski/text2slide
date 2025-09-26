import { Bold, Italic, Underline } from "lucide-react"

interface Props {
    OnSetBold: (isBold: boolean) => void 
    OnSetItalic: (isItalic: boolean) => void 
    OnSetUnderline: (isUnderline: boolean) => void 
}

import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../components/ui/toggle-group"
import { useState } from "react"

export function Format({ OnSetBold, OnSetItalic, OnSetUnderline }: Props) {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)

  const toggleBold = () => {
      setBold(prev => {
        OnSetBold(!prev)
        return !prev
      })
  }

  const toggleItalic = () => {
    setItalic(prev => {
      OnSetItalic(!prev)
      return !prev
    })
  }

  const toggleUnderline = () => {
    setUnderline(prev => {
      OnSetUnderline(!prev)
      return !prev 
    })
    
  }


  return (
    <ToggleGroup variant="outline" type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={toggleBold}>
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={toggleItalic}>
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" onClick={toggleUnderline}>
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
