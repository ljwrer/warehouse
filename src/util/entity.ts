interface TimeRecord {
  createdAt: number
  updatedAt: number
}
export const createEntity = <T extends TimeRecord>(
  ctx: T,
  partial: Partial<T>,
) => {
  if (partial) {
    Object.assign(this, partial)
    const now = Date.now()
    ctx.createdAt = ctx.createdAt ?? now
    ctx.updatedAt = now
  }
}
