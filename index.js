// fonction constructice de notre objet ContentManager
function ContentManager(products) {

    // this fait reference a ContentManager
    // la ligne ci-dessous définis un attribut products pour notre objet ContentManager via le mot clé this
    // Cette attribut prend pour valeur la variable products passer en parametre qui correspond au données de nos cards (voir ligne 93)
    // Cette attribut est par la suite disponible dans n'importe quel methode de ContentManager
    this.products = products;
}

// Methode generateProductsCards que l'on rattache a notre objet ContentManager via son prototype
// Cette methode nous permet de generer dans notre html nos cards a partir des données passer a notre constructeur ContentManager
ContentManager.prototype.generateProductsCards = function () {


        // On cible l'element du dom dans lequel on va vouloir generer nos cards
        let cible = document.getElementById('productCards');

            // On boucle sur nos données
            // this fait réference a ContentManager, a partir de ce mot clé on peut récuperer et utiliser tout les attributs et/ou méthode de ContentManager
            this.products.forEach(element => {

                
                // On fait appel a la methode ratingAverage de ContentManager
                // Cette methode prend en paramettre un tableau d'entier et nous retourne la moyenne de chacune des valeurs additionner
                let moyenne = this.ratingAverage(element.ratings);

                // On déclare une string vide qui contiendra tout les span generer à partir de la moyenne des ratings
                let span = "";
                // On boucle à partir de la moyenne des ratings (une moyenne de 3 nous fait faire 3 tour de boucle et genere par conséquent 3 span)
                for (let i = 0; i < moyenne; i++) {
                    // On ajoute a notre string un span a chaque tour de boucle
                    span += `<span class='fa fa-star'></span>`;
                }

                // Ici on utilise les backquote qui nous permette 2 chose ->
                // 1 - permet de déclarer un string sur plusieurs ligne sans avoir a utiliser la concatenation
                // 2 - permet via la syntaxe ci-dessous d'inserer directement une variable dans une string
                // Au final la variable domElement contiendra la structure html ainsi que les donnée correspondant a une card
                let domElement = `<figure>
                    <img alt='${element.title}'
                        src='${element.img}'>
                    <figcaption>
                        <h3>${element.title}</h3>
                        <span class='tag'>${element.subtitle}</span>
                        <p>${element.resume}</p>
                        <div class='rating'>
                           ${span} 
                        </div>
                    </figcaption>
                </figure>`;

                // A chaque tour de boucle on insere la card definis ci-dessus via la propriéter innerHTML
                // Attention ici si on ne fait pas += mais = alors on ecraserait tout le contenue html déjà présent dans notre conteneur 
                cible.innerHTML += domElement;

            });


}

// Methode qui retourne la moyenne des notes attribuer a un product
// Cette methode prend en parametre un tableau ratings
ContentManager.prototype.ratingAverage = function(ratings) {

    // On définis une variable somme que l'on initialise a 0
    // Elle nous permettras de stocker le résultat des additions de chaque ratings
    let somme = 0;

    // On déclare une boucle qui va parcourir tout les element du tableau ratings
    for (let index = 0; index < ratings.length; index++) {
        // On récupere un element du tableau à partir de son index
        const element = ratings[index];

        // A chaque tour de boucle on additionne la valeur au précèdente
        somme += element
    }

    // Pour obtenir la moyenne des ratings on divise la somme total des element par ne nombre d'elements
    // On fait ici appel a la methode floor de l'objet Math pour s'assurer d'avoir un nombre entier
    let moyenne = Math.floor(somme/ratings.length);

    // On renvoie la moyenne calculer
    // De cette façon notre méthode est dynamique et peut etre appeler plusieurs fois pour calculer diffèrente moyenne
    return moyenne;
    
}



// Ici on instancie un nouvel objet ContentManager en fesant appel a sa methode constructeur
// On passe en parametre de la methode constructeur un tableau d'objet qui correspond aux données que nous utiliserons pour generer nos cards
let contentManager = new ContentManager([
    { title: "A Taste of the Kitchen", subtitle: "Served Family Style", resume: "Vel nam odio dolorem, voluptas sequi minus quo tempore, animi est quia earum maxime. Reiciendisquae repellat, modi non, veniam.", img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/first-course.jpg", ratings: [5, 3, 5, 4, 5, 3, 4, 1]},
    { title: "Rustic Reds", subtitle: "From the land of Italy", resume: "Vel nam odio dolorem, voluptas sequi minus quo tempore, animi est quia earum maxime. Reiciendisquae repellat, modi non, veniam.", img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/second-course.jpg", ratings: [2, 3, 1, 4, 2, 3, 4, 1]},
    { title: "Delicious Desserts", subtitle: "Seasonal Ingredients", resume: "Vel nam odio dolorem, voluptas sequi minus quo tempore, animi est quia earum maxime. Reiciendisquae repellat, modi non, veniam.", img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/third-course.jpg", ratings: [1, 3, 1, 4, 4, 3, 4, 2]}
]);

// On fait appel a la methode ci-dessous a partir de notre objet ContentManager que l'on as au préalable stocker dans une variable contentManager
// Cette methode permet de générer dynamiquement nos cards à partir des données passer en parametre du contructeur ContentManager
contentManager.generateProductsCards();


