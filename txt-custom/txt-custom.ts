export function txtCustom(text: string, style: string): string {
  const styleFunction = styles[style as keyof typeof styles]

  if (!styleFunction) return text

  return styleFunction(text)
}

const styles = {
  discord: discordCustom
}


function discordCustom(text : string) {
  const border = "=+".repeat(20)
  return border + `\n` + text + `\n` + border      
}