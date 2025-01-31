<script lang="ts">
  let {
    file,
    index,
    ondelete = () => {}
  }: {
    file: File;
    index: number;
    ondelete?: (index: number) => void;
  } = $props();
</script>

<div class="flex items-center gap-2">
  <div class="rounded-lg bg-gray-300 px-2 py-1">
    <strong>{file.name}</strong>
  </div>
  <a
    href="#delete"
    class="underline"
    onclick={(e) => {
      e.preventDefault();
      ondelete(index);
    }}>Delete</a
  >
</div>
