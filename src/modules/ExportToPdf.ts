import html2canvas from 'html2canvas';

export async function exportToPdf() {
    const element = document.querySelector('.document') as HTMLElement;

    const canvas = await html2canvas(element);
    const image = canvas.toDataURL();

    const link = document.createElement('a')
    link.href = image
    link.download = 'notes'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
}