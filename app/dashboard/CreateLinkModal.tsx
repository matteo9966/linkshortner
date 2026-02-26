"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { z } from "zod";
import { DOMAttributes } from "react";
import { createLinkAction } from "./actions";
import { Button } from "@/components/ui/button";

const CreateLinkFormSchema = z.object({
  url: z.string(),
  slug: z.string().optional(),
});

export default function CreateLinkModal({ userId }: { userId: string }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = async (
    event,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const input = {
      url: formData.get("url"),
      slug: formData.get("slug"),
    };

    const validation = CreateLinkFormSchema.safeParse(input);
    if (!validation.success) {
      alert("Invalid input");
      return;
    }
    const data = validation.data;

    const result = await createLinkAction({
      url: data.url,
      slug: data.slug,
      userId: userId,
    });

    if (result.error) {
      alert(result.error);
    } else {
      alert("Link created successfully!");
      closeModal();
    }
    // Call the server action here
  };

  return (
    <>
      <Button onClick={openModal} className="btn btn-primary mb-2 w-full">
        Create Link
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-6 bg-black rounded shadow-lg text-white relative">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white hover:text-red-500"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center">
            Create a New Link
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block mb-1 font-medium">
                URL
              </label>
              <input
                type="url"
                name="url"
                required
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="btn btn-primary">
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
