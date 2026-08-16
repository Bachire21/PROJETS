import type { OrientationRequest } from "@/data/demandes";

export function nextRequestNumber(requests: OrientationRequest[]): string {
  let max = 0;
  for (const request of requests) {
    const match = /CW-(\d+)/.exec(request.number);
    if (match) {
      max = Math.max(max, parseInt(match[1], 10));
    }
  }
  return `CW-${String(max + 1).padStart(4, "0")}`;
}