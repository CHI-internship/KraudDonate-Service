export interface IHint {
  id: number;
  title: string;
  info: string;
  user_id: number;
  createdAt: Date;
  hint_photo?: IHintPhoto[];
  updatedAt: Date | null;
}

interface IHintPhoto {
  id: number;
  photo: string;
  hint_id: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface IHints {
  page: number;
  limit: number;
  totalPages: number;
  data: IHint[];
}
