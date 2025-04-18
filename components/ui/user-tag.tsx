"use client"
import { AdminBadge } from "./badges/admin-badge"
import { StaffBadge } from "./badges/staff-badge"
import { BetaBadge } from "./badges/beta-badge"
import { DonorBadge } from "./badges/donor-badge"

export type TagType = "admin" | "staff" | "beta" | "doador"

interface UserTagProps {
  type: TagType
}

export function UserTag({ type }: UserTagProps) {
  switch (type) {
    case "admin":
      return <AdminBadge />
    case "staff":
      return <StaffBadge />
    case "beta":
      return <BetaBadge />
    case "doador":
      return <DonorBadge />
    default:
      return null
  }
}
