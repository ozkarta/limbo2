export class Proposal{
    hostJobID: string;
    candidateID: string;
    price: string;
    currency: string;
    duration: string;
    coverLetter: string;
    whyToChoose: string;
    offerStatus: string;

    constructor(){
        this.hostJobID = '';
        this.candidateID = '';
        this.price = '';
        this.currency = '';
        this.duration = '';
        this.coverLetter = '';
        this.whyToChoose = '';
        this.offerStatus = '';
    }
}