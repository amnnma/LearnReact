import React, { component } from 'react'
import { Link } from "@reach/router"

class ErrorBoundary extends Component {
      constructor(props) {
          super(props)
          this.state = { hasError: false}
      }
}