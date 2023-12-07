export interface Plant {
  id: number;
  img_url: string;
  name: string;
  description: string;
}

export interface Bookmark {
  id: number;
  name: string;
  entity_id: string;
  entity_type: string;
  is_bookmarked: boolean;
}
