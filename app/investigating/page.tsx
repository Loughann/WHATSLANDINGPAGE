"use client"
import dynamic from "next/dynamic"

/*  This file is a *Server Component*.
    We lazily load the browser-only implementation below,
    disabling SSR to avoid any window-related errors.           */
const InvestigatingClient = dynamic(() => import("./_client"), { ssr: false })

export default function InvestigatingPage() {
  return <InvestigatingClient />
}
