<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <img src="/icons/3d-machine.svg" alt="3D Commerce" class="footer-logo" />
        <span class="footer-title">3D Commerce</span>
      </div>
      <div class="footer-links">
        <a href="mailto:contato@3dcommerce.com" target="_blank">Contato</a>
        <a href="https://wa.me/5519997585697" target="_blank">WhatsApp</a>
      </div>
      <div class="footer-copy">
        &copy; {{ new Date().getFullYear() }} 3D Commerce. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  background: #f7f7f7;
  border-top: 1px solid #e0e0e0;
  padding: 32px 0 16px 0;
  margin-top: 40px;
  width: 100%;
}
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.footer-logo {
  width: 38px;
  height: 38px;
}
.footer-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #222;
}
.footer-links {
  display: flex;
  gap: 24px;
  margin: 8px 0;
}
.footer-links a {
  color: #007BFF;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: #0056b3;
  text-decoration: underline;
}
.footer-copy {
  font-size: 0.95rem;
  color: #888;
  margin-top: 8px;
}
</style>