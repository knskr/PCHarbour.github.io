const products = [
  {
    name: "$2000 Multimedia and Productivity PC",
    image: "assets/img/product1.jpg",
    description: "This PC is the pinnacle of productivity PCs. It comes with an i7-14700k and a 4070 Ti SUPER, and is hands down the best productivity PC we have built."
  },
  {
    name: "$700 Gaming PC",
    image: "assets/img/product2.jpg",
    description: "This PC is one of our most sold budget builds. It rocks a Ryzen 5 7500F and the RX 6600M. This build even though it's cheap, still rocks when it comes to 1080p performance and has a solid 1440p performance. It even has basic live streaming capabilities!"
  },
  {
    name: "$800 Gaming PC",
    image: "assets/img/product3.jpg",
    description: "The best budget gaming PC we have built. The most sold and the most recommended when it comes to a budget 1440p gaming PC. It has a Ryzen 5 7500F and a RX 7600. It is also good for live streaming, and even for video and photo editing!"
  },
  {
    name: "$1500 Multimedia and Productivity PC",
    image: "assets/img/product4.jpg",
    description: "This is the 'younger brother' of the $2000 PC that we have. While it has an i5-14500F and a 4070 SUPER, it still has an insane price to performance ratio."
  },
  {
    name: "$1200 Multimedia and Productivity PC",
    image: "assets/img/product5.jpg",
    description: "This PC is 'the youngest child' of the productivity lineup. It also has an i5-14500F, but comes with a weaker 4060 Ti. However, it still performs great, has great editing and streaming capabilities and a great price."
  },
  {
    name: "$650 APU Gaming PC",
    image: "assets/img/product6.jpg",
    description: "This PC is what we like to call a 'stepping stone'. It has the newest 8th gen Ryzen 5 8600G that has the Radeon 760M iGPU that has solid 1080p performance. This is a future proof PC which you can upgrade with a graphics card that you can't buy at the moment."
  },
  {
    name: "$1500 Gaming PC",
    image: "assets/img/product7.jpg",
    description: "The best all around $1500 PC that we have. It has insane 1440p performance, and can delve deeper into the 4K resolution. It comes with a Ryzen 7700X and a 4070 SUPER."
  },
  {
    name: "$500 Gaming PC",
    image: "assets/img/product8.jpg",
    description: "This PC should not be mistaken for a weak one, as it has spectacular 1080p performance. It does have a 12th gen i3-12100F CPU, but it does come with the Intel ARC A580 GPU, which is also good for livestreaming as it has a great encoder."
  },
  {
    name: "$1200 Gaming PC",
    image: "assets/img/product9.jpg",
    description: "This PC is the best $1200 PC we built. Even though it can't run games smoothly at 4K, it's still an insane 1440p PC. We put the Ryzen 5 7600 and the best 1440p GPU, the AMD RX 7800XT."
  },
  {
    name: "$1800 Gaming PC",
    image: "assets/img/product10.jpg",
    description: "The $1800 PC rocks the best gaming CPU on the market - the Ryzen 7 7800X3D and the RX 7900XT. This PC has stellar capabilities when it comes to 4K, and even better capabilities for 1440p."
  },
  {
    name: "$1000 Gaming PC",
    image: "assets/img/product11.jpg",
    description: "This PC is a great 1440p performer, and even has entry level VR capabilities. It has a Ryzen 5 7600X and the RX 7600XT. Overall the best budget 1440p PC that you can buy right now."
  },
  {
    name: "$2000 Gaming PC",
    image: "assets/img/product12.jpg",
    description: "If the $2000 Productivity PC was the best in its class, then this would be its gaming counterpart. It has the best gaming CPU, the Ryzen 7 7800X3D and AMDs' top of the shelf GPU - the RX 7900XTX. It has insane 4K performance, and it doesn't break a sweat when it comes to VR, streaming, or editing."
  }
];


const productsRow = $("#products-row");
let groupHTML = '';

products.forEach((product, index) => {
  if(index % 3 === 0) groupHTML += `<div class="card-group cs-bg-goldenrod">`;

  groupHTML += `
    <div class="card rounded">
      <img src="${product.image}" class="card-img-top" alt="${product.name}">
      <div class="card-body text-center">
        <h5 class="card-title cs-text">${product.name}</h5>
        <button class="read-more-btn" data-index="${index}">Read more</button>
      </div>
    </div>
  `;

  if(index % 3 === 2 || index === products.length - 1) groupHTML += `</div>`;
});

productsRow.html(groupHTML);

$(".read-more-btn").on("click", function() {
  const index = $(this).data("index");
  const product = products[index];

  $("#productModalLabel").text(product.name);
  $("#productModalImage").attr("src", product.image).attr("alt", product.name);
  $("#productModalDescription").text(product.description);

  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
});
