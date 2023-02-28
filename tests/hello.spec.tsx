import { Button } from "@/components/Button"
import { render } from '@testing-library/react'

describe(Button, () => {
  it('works', () => {
    render(<Button className="asd" color="blue" variant="solid" >Hello </Button>)
  })
})
