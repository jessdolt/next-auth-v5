import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import CardWrapper from "./card-wrapper"

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="w-full">
        <ExclamationTriangleIcon className="mx-auto text-destructive w-8 h-8 p-1" />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard
