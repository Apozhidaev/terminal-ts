import React from "react";
import ReactMarkdown from "react-markdown";
import decryptedContent from "../wrappers/decryptedContent";

type Props = {
  value: string;
};

const Content = ({ value }: Props) => (
  <pre className="card-text">
    <ReactMarkdown source={value} />
  </pre>
);

export default decryptedContent(Content);
