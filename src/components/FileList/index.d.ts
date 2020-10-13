interface FileProps {
  name: string;
  readableSize: string;
}

export default interface FileListProps {
  files: FileProps[];
}
