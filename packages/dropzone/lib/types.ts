export interface DropzoneProps {
  dropzoneTitle?: string
  uploadButtonText?: string
  acceptFileExtension: string
  uploadApiRoute: string
  afterProcessed: (parsedData: string) => void
}
