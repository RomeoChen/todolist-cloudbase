export interface ITodo {
  _id: string;
  _openid: string;
  title: string;
  done: boolean;
  type: 'text' | 'checklist';
  content: string | Array<ICheckListItem>;
  date: Date;
}

export interface ICheckListItem {
  text: string;
  done: boolean;
}