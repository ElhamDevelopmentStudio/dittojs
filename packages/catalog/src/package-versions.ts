export type PackageDependencyType = "dependencies" | "devDependencies" | "peerDependencies"

export type PackageVersionInfo = {
  name: string
  version: string
  range: string
  dependencyType: PackageDependencyType
  notes?: string
}

export const PACKAGE_VERSION_POLICY = {
  policy: "caret",
  generatedWithPackageVersionsAt: "2026-07-06",
  source: "npm view <package> version",
} as const

export const packageVersions = {
  "@base-ui/react": {
    name: "@base-ui/react",
    version: "1.6.0",
    range: "^1.6.0",
    dependencyType: "dependencies",
  },
  "@hookform/resolvers": {
    name: "@hookform/resolvers",
    version: "5.4.0",
    range: "^5.4.0",
    dependencyType: "dependencies",
  },
  "@tailwindcss/vite": {
    name: "@tailwindcss/vite",
    version: "4.3.2",
    range: "^4.3.2",
    dependencyType: "devDependencies",
  },
  "@types/react": {
    name: "@types/react",
    version: "19.2.17",
    range: "^19.2.17",
    dependencyType: "devDependencies",
  },
  "@types/react-dom": {
    name: "@types/react-dom",
    version: "19.2.3",
    range: "^19.2.3",
    dependencyType: "devDependencies",
  },
  "@vitejs/plugin-react": {
    name: "@vitejs/plugin-react",
    version: "6.0.3",
    range: "^6.0.3",
    dependencyType: "devDependencies",
  },
  axios: {
    name: "axios",
    version: "1.18.1",
    range: "^1.18.1",
    dependencyType: "dependencies",
  },
  "class-variance-authority": {
    name: "class-variance-authority",
    version: "0.7.1",
    range: "^0.7.1",
    dependencyType: "dependencies",
  },
  clsx: {
    name: "clsx",
    version: "2.1.1",
    range: "^2.1.1",
    dependencyType: "dependencies",
  },
  "lucide-react": {
    name: "lucide-react",
    version: "1.23.0",
    range: "^1.23.0",
    dependencyType: "dependencies",
  },
  react: {
    name: "react",
    version: "19.2.7",
    range: "^19.2.7",
    dependencyType: "dependencies",
  },
  "react-dom": {
    name: "react-dom",
    version: "19.2.7",
    range: "^19.2.7",
    dependencyType: "dependencies",
  },
  "react-hook-form": {
    name: "react-hook-form",
    version: "7.81.0",
    range: "^7.81.0",
    dependencyType: "dependencies",
  },
  "tailwind-merge": {
    name: "tailwind-merge",
    version: "3.6.0",
    range: "^3.6.0",
    dependencyType: "dependencies",
  },
  tailwindcss: {
    name: "tailwindcss",
    version: "4.3.2",
    range: "^4.3.2",
    dependencyType: "devDependencies",
  },
  typescript: {
    name: "typescript",
    version: "6.0.3",
    range: "^6.0.3",
    dependencyType: "devDependencies",
  },
  vite: {
    name: "vite",
    version: "8.1.3",
    range: "^8.1.3",
    dependencyType: "devDependencies",
  },
  zod: {
    name: "zod",
    version: "4.4.3",
    range: "^4.4.3",
    dependencyType: "dependencies",
  },
  zustand: {
    name: "zustand",
    version: "5.0.14",
    range: "^5.0.14",
    dependencyType: "dependencies",
  },
} satisfies Record<string, PackageVersionInfo>

export type KnownPackageName = keyof typeof packageVersions

export function packageRange(packageName: KnownPackageName): string {
  return packageVersions[packageName].range
}
