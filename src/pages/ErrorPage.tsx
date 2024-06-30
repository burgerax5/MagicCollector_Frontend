import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="not-found">
      <span>404</span>
      <span>NOT FOUND</span>
    </div>
  )
}

export default ErrorPage