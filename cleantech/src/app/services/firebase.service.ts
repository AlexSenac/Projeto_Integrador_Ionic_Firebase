import { Injectable } from '@angular/core';
import { Produto } from '../model/produto.model';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  setDoc,
  updateDoc,
  DocumentData,
  docData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Perfil } from '../model/perfil.model';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  save(produtos: Produto): Promise<void> {
    const document = doc(collection(this.firestore, 'produtos'));
    return setDoc(document, produtos);
  }

  list(): Observable<Produto[]> {
    const produtosCollection = collection(this.firestore, 'produtos');
    return collectionData(produtosCollection, { idField: 'id' }).pipe(
      map((result) => result as Produto[])
    );
  }

  find(id: string): Observable<Produto> {
    const document = doc(this.firestore, `produtos/${id}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Produto;
      })
    );
  }

  findByName(nome: string): Observable<Produto[]> {
    const produtosList = this.list();
    return produtosList.pipe(
      map((produtos) =>
        produtos.filter((produtos) => {
          const fullName = produtos.name.concat('', produtos.type);
          return fullName.toLowerCase().match(nome.toLowerCase());
        })
      )
    );
  }

  update(produtos: Produto): Promise<void> {
    const document = doc(this.firestore, 'produtos', produtos?.id);
    const { id, ...data } = produtos;
    return updateDoc(document, data);
  }

  findPerfil(): Observable<DocumentData> {
    const userId = this.auth.currentUser!.uid;
    const document = doc(this.firestore, `perfils/${userId}`);
    return docData(document);
  }

  updatePerfil(name: any): Promise<void> {
    const userId = this.auth.currentUser!.uid;
    const document = doc(this.firestore, 'perfils', userId);
    return setDoc(document, { name });
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'produtos', id);
    console.log(document);
    return deleteDoc(document);
  }
}
