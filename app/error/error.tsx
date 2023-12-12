// pages/auth/error.tsx
import React from "react";

interface ErrorPageProps {
  statusCode?: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => (
  <div>
    <p>{statusCode ? `An error ${statusCode} occurred on the server` : "An error occurred on the client"}</p>
  </div>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
