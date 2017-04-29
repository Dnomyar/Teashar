

export interface Upload {

  upload(filePath: string, progress: (number) => void): Promise<string>

}
