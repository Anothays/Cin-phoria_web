
export interface ApiJSONResponseType {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:totalItems": number;
  "hydra:member": (HydraMember & { [key: string]: any })[];
}

export interface HydraMember {
  "@id": string;
  "@type": string;
  id: number;
}
