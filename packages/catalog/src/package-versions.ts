export type PackageDependencyType = "dependencies" | "devDependencies" | "peerDependencies"
export type PackageVersionPolicy = "caret" | "exact"

export type PackageVersionInfo = {
  name: string
  version: string
  range: string
  policy: PackageVersionPolicy
  dependencyType: PackageDependencyType
  notes?: string
}

export const PACKAGE_VERSION_POLICY = {
  policy: "caret",
  generatedWithPackageVersionsAt: "2026-07-06",
  source: "npm view <package> version",
} as const

export const MVP_PACKAGE_NAMES = [
  "@base-ui/react",
  "@hookform/resolvers",
  "@tailwindcss/vite",
  "@types/react",
  "@types/react-dom",
  "@vitejs/plugin-react",
  "axios",
  "class-variance-authority",
  "clsx",
  "lucide-react",
  "react",
  "react-dom",
  "react-hook-form",
  "tailwind-merge",
  "tailwindcss",
  "typescript",
  "vite",
  "zod",
  "zustand",
] as const

export type KnownPackageName = (typeof MVP_PACKAGE_NAMES)[number]

export const packageVersions = {
  "@base-ui/react": {
    name: "@base-ui/react",
    version: "1.6.0",
    range: "^1.6.0",
    policy: "caret",
    dependencyType: "dependencies",
  },
  "@hookform/resolvers": {
    name: "@hookform/resolvers",
    version: "5.4.0",
    range: "^5.4.0",
    policy: "caret",
    dependencyType: "dependencies",
  },
  "@tailwindcss/vite": {
    name: "@tailwindcss/vite",
    version: "4.3.2",
    range: "^4.3.2",
    policy: "caret",
    dependencyType: "devDependencies",
  },
  "@types/react": {
    name: "@types/react",
    version: "19.2.17",
    range: "^19.2.17",
    policy: "caret",
    dependencyType: "devDependencies",
  },
  "@types/react-dom": {
    name: "@types/react-dom",
    version: "19.2.3",
    range: "^19.2.3",
    policy: "caret",
    dependencyType: "devDependencies",
  },
  "@vitejs/plugin-react": {
    name: "@vitejs/plugin-react",
    version: "6.0.3",
    range: "^6.0.3",
    policy: "caret",
    dependencyType: "devDependencies",
  },
  axios: {
    name: "axios",
    version: "1.18.1",
    range: "^1.18.1",
    policy: "caret",
    dependencyType: "dependencies",
  },
  "class-variance-authority": {
    name: "class-variance-authority",
    version: "0.7.1",
    range: "^0.7.1",
    policy: "caret",
    dependencyType: "dependencies",
  },
  clsx: {
    name: "clsx",
    version: "2.1.1",
    range: "^2.1.1",
    policy: "caret",
    dependencyType: "dependencies",
  },
  "lucide-react": {
    name: "lucide-react",
    version: "1.23.0",
    range: "^1.23.0",
    policy: "caret",
    dependencyType: "dependencies",
  },
  react: {
    name: "react",
    version: "19.2.7",
    range: "^19.2.7",
    policy: "caret",
    dependencyType: "dependencies",
  },
  "react-dom": {
    name: "react-dom",
    version: "19.2.7",
    range: "^19.2.7",
    policy: "caret",
    dependencyType: "dependencies",
  },
  "react-hook-form": {
    name: "react-hook-form",
    version: "7.81.0",
    range: "^7.81.0",
    policy: "caret",
    dependencyType: "dependencies",
  },
  "tailwind-merge": {
    name: "tailwind-merge",
    version: "3.6.0",
    range: "^3.6.0",
    policy: "caret",
    dependencyType: "dependencies",
  },
  tailwindcss: {
    name: "tailwindcss",
    version: "4.3.2",
    range: "^4.3.2",
    policy: "caret",
    dependencyType: "devDependencies",
  },
  typescript: {
    name: "typescript",
    version: "6.0.3",
    range: "^6.0.3",
    policy: "caret",
    dependencyType: "devDependencies",
  },
  vite: {
    name: "vite",
    version: "8.1.3",
    range: "^8.1.3",
    policy: "caret",
    dependencyType: "devDependencies",
  },
  zod: {
    name: "zod",
    version: "4.4.3",
    range: "^4.4.3",
    policy: "caret",
    dependencyType: "dependencies",
  },
  zustand: {
    name: "zustand",
    version: "5.0.14",
    range: "^5.0.14",
    policy: "caret",
    dependencyType: "dependencies",
  },
} satisfies Record<KnownPackageName, PackageVersionInfo>

export function packageRange(packageName: KnownPackageName): string {
  return packageVersions[packageName].range
}
