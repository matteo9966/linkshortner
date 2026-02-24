"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EditLinkModal from "./EditLinkModal";
import DeleteLinkModal from "./DeleteLinkModal";
import { useState } from "react";
import { LinkSchemaType } from "@/db/schema";

export const LinkCard = ({ link }: { link: LinkSchemaType }) => {
  const [updateModal, setUpdateModal] = useState<LinkSchemaType | null>(null);
  const [deleteModal, setDeleteModal] = useState<LinkSchemaType | null>(null);

  const handleUpdate = (link: LinkSchemaType) => {
    setUpdateModal(link);
  };

  const handleDelete = (link: LinkSchemaType) => {
    setDeleteModal(link);
  };

  return (
    <>
      {updateModal && (
        <EditLinkModal
          linkId={updateModal.id}
          currentUrl={updateModal.originalUrl}
          currentSlug={updateModal.shortCode}
          onClose={() => setUpdateModal(null)}
        />
      )}
      {deleteModal && (
        <DeleteLinkModal
          linkId={deleteModal.id}
          onClose={() => setDeleteModal(null)}
        />
      )}
      <Card
        className={cn(
          "hover:shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300 p-4",
        )}
      >
        <CardHeader>
          <CardTitle>{link.shortCode}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Original URL: {" "}
            <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
              {link.originalUrl}
            </a>
          </p>
          <p>Created At: {new Date(link.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(link.updatedAt).toLocaleString()}</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => handleUpdate(link)}>Update</Button>
            <Button onClick={() => handleDelete(link)}>Delete</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
