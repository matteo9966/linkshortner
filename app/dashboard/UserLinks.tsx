import React from "react";
import { getUserLinks } from "@/data/links";
import { getAuthUserId } from "@/models/auth";

const UserLinks = async () => {
  const userId = await getAuthUserId();
  if (!userId) {
    return <div>Error: Unauthorized</div>;
  }

  try {
    const links = await getUserLinks(userId);

    return (
      <div>
        <h1>Your Links</h1>
        {links.length === 0 ? (
          <p>No links found.</p>
        ) : (
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                  {link.shortCode}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } catch (error) {
    return <div>Error: Failed to fetch links</div>;
  }
};

export default UserLinks;