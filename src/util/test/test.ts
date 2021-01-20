import { writeSync } from 'clipboardy'

export const log = (data: any) => {
  if (data.toJSON) {
    console.log(data.toJSON())
  } else {
    console.log(JSON.stringify(data, null, 2))
  }
}

export const logJSONStr = (data: any) => {
  const str = JSON.stringify(data)
  console.log(str)
  writeSync(str)
}

export const sleep = (duration: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })

export const copy = (data: any) => JSON.parse(JSON.stringify(data))
