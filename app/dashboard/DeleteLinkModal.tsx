"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { deleteLinkAction } from "./actions";

type DeleteLinkModalProps = {
  linkId: string;
  onClose: () => void;
};

export default function DeleteLinkModal({ linkId, onClose }: DeleteLinkModalProps) {
  const [isModalOpen, setModalOpen] = useState(true);

  const handleDelete = async () => {
    const result = await deleteLinkAction(linkId);

    if (result.error) {
      alert(result.error);
    } else {
      alert("Link deleted successfully!");
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

        <h2 className="text-2xl font-bold mb-4 text-center">Delete Link</h2>
        <p className="text-center mb-4">Are you sure you want to delete this link?</p>
        <div className="flex justify-center gap-4">
          <Button onClick={handleDelete} className="btn btn-danger">
            Delete
          </Button>
          <Button onClick={() => { setModalOpen(false); onClose(); }} className="btn btn-secondary">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}