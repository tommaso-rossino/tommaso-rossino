"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Project } from "@/types";

interface ModalContextType {
  activeProject: Project | null;
  openModal: (project: Project) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  activeProject: null,
  openModal: () => {},
  closeModal: () => {},
});

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openModal = (project: Project) => setActiveProject(project);
  const closeModal = () => setActiveProject(null);

  return (
    <ModalContext.Provider value={{ activeProject, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
