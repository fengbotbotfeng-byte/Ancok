// Aturan tampil kartu ucapan.
   //   visible === false  -> selalu disembunyikan
     //   visible === true   -> selalu tampil
       //   selain itu ("auto") -> tampil bila name dan message sudah terisi    //shafiqganteng
export function isWishVisible(wish) {
  if (wish.visible === false) return false;
  if (wish.visible === true) return true;
  return Boolean(wish.name && wish.name.trim() && wish.message && wish.message.trim());
}
