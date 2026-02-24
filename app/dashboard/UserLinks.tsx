import { getUserLinks } from "@/data/links";
import { getAuthUserId } from "@/models/auth";
import { LinkCard } from "./LinkCard";

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
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
            
              />
            ))}
          </div>
        )}

      </div>
    );
  } catch (error) {
    return <div>Error: Failed to fetch links</div>;
  }
};

export default UserLinks;
