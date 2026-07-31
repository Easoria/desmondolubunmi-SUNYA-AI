export function pageMeta(title: string, description: string) {
  return [
    { title },
    {
      name: "description",
      content: description,
    },
  ];
}
