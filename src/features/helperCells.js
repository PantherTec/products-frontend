import React from "react";

const LinkCell = (link, href) => <a href={href ? href : "#"}>{link}</a>;
const TextCell = text => <p>{text}</p>;

export { LinkCell, TextCell };
