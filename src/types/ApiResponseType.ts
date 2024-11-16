
export interface ApiJSONResponseType<T> {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:totalItems": number;
  "hydra:member": (HydraMember & T)[];
}

export interface HydraMember {
  "@id": string;
  "@type": string;
  id: number;
}
