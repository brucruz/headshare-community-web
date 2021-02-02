export default function textBetweenTags(
  text: string,
  tag: string,
): string | undefined {
  const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'gm');

  const matchedArray = regex.exec(text);

  if (matchedArray) {
    const innerText = matchedArray[1];

    return innerText;
  }

  return undefined;
}
