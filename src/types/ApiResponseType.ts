
export interface ApiJSONResponseType {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:totalItems": number;
  "hydra:member": (HydraMember & { [key: string]: unknown })[];
}

export interface HydraMember {
  "@id": string;
  "@type": string;
  id: number;
}
