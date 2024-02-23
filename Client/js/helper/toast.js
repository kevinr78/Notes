import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

function showErrorToast({ message }) {
  let toast = `
    <div class="toast-container position-fixed bottom-0 end-0 p-3 " data-bs-autohide="true">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header text-bg-danger">
          <strong class="me-auto">Error</strong>
          <small>${new Date().toLocaleTimeString()}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body text-bg-danger">
          ${message}
        </div>
      </div>
    </div>`;

  document
    .querySelector(".toast-container")
    .insertAdjacentHTML("beforeend", toast);
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}
function showSuccessToast(message) {
  let toast = `
    <div class="toast-container position-fixed bottom-0 end-0 p-3 " data-bs-autohide="true">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header text-bg-danger">
          <strong class="me-auto">Message</strong>
          <small>${new Date().toLocaleTimeString()}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body text-bg-danger">
          ${message}
        </div>
      </div>
    </div>`;

  document
    .querySelector(".toast-container")
    .insertAdjacentHTML("beforeend", toast);
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}

export { showErrorToast, showSuccessToast };
