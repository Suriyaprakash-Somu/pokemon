export default function getTypeGradient(type) {
  const gradients = {
    normal: "linear-gradient(to bottom, #d3d3d3, #a8a8a8)",
    fire: "linear-gradient(to bottom, #ffa756, #ff7400)",
    water: "linear-gradient(to bottom, #56a3ff, #0078ff)",
    electric: "linear-gradient(to bottom, #ffde5a, #ffc107)",
    grass: "linear-gradient(to bottom, #8dd694, #5cb85c)",
    ice: "linear-gradient(to bottom, #96e9e8, #00bcd4)",
    fighting: "linear-gradient(to bottom, #ff9d9d, #ff5722)",
    poison: "linear-gradient(to bottom, #d6a2e4, #9c27b0)",
    ground: "linear-gradient(to bottom, #e7cba3, #cdac76)",
    flying: "linear-gradient(to bottom, #c9d9ff, #90a4ae)",
    psychic: "linear-gradient(to bottom, #ff9dbf, #ff4081)",
    bug: "linear-gradient(to bottom, #c5e26a, #8bc34a)",
    rock: "linear-gradient(to bottom, #d8d8c0, #a59c66)",
    ghost: "linear-gradient(to bottom, #a292bc, #673ab7)",
    dragon: "linear-gradient(to bottom, #8fa8ff, #3f51b5)",
    dark: "linear-gradient(to bottom, #8e8e8e, #424242)",
    steel: "linear-gradient(to bottom, #d3d3d3, #9e9e9e)",
    fairy: "linear-gradient(to bottom, #ffb6e9, #ff4db6)",
  };

  return gradients[type] || gradients.normal;
}
