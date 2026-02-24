"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { z } from "zod";
import { DOMAttributes } from "react";
import { Button } from "@/components/ui/button";
import { updateLinkAction } from "./actions";

const EditLinkFormSchema = z.object({
  url: z.string().optional(),
  slug: z.string().optional(),
});

type EditLinkModalProps = {
  linkId: string;
  currentUrl: string;
  currentSlug: string;
  onClose: () => void;
};

export default function EditLinkModal({ linkId, currentUrl, currentSlug, onClose }: EditLinkModalProps) {
  const [isModalOpen, setModalOpen] = useState(true);

  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = async (
    event,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const input = {
      url: formData.get("url")?.toString(),
      slug: formData.get("slug")?.toString(),
    };

    const validation = EditLinkFormSchema.safeParse(input);
    if (!validation.success) {
      alert("Invalid input");
      return;
    }
    const data = validation.data;

    const result = await updateLinkAction(linkId, data);

    if (result.error) {
      alert(result.error);
    } else {
      alert("Link updated successfully!");
      setModalOpen(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => { setModalOpen(false); onClose(); }}>
      <div className="p-6 bg-black rounded shadow-lg text-white relative">
        <button
          onClick={() => { setModalOpen(false); onClose(); }}
          className="absolute top-2 right-2 text-white hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Edit Link</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block mb-1 font-medium">
              URL
            </label>
            <input
              type="url"
              name="url"
              defaultValue={currentUrl}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block mb-1 font-medium">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              defaultValue={currentSlug}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="btn btn-primary">
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}