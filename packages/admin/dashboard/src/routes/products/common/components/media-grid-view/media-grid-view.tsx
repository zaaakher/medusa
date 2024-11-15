import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { CheckMini, Spinner, ThumbnailBadge } from "@medusajs/icons"
import { clx, Tooltip } from "@medusajs/ui"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"

interface MediaView {
  id?: string
  field_id: string
  url: string
  isThumbnail: boolean
}

interface MediaGridProps {
  media: MediaView[]
  selection: Record<string, boolean>
  onCheckedChange: (id: string) => (value: boolean) => void
}

export const MediaGrid = ({
  media,
  selection,
  onCheckedChange,
}: MediaGridProps) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="bg-ui-bg-subtle size-full overflow-auto">
        <div className="grid h-fit auto-rows-auto grid-cols-4 gap-6 p-6">
          <SortableContext items={media} strategy={rectSortingStrategy}>
            {media.map((m) => {
              return (
                <MediaGridItem
                  onCheckedChange={onCheckedChange(m.id!)}
                  checked={!!selection[m.id!]}
                  key={m.field_id}
                  media={m}
                />
              )
            })}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  )
}

interface MediaGridItemProps {
  media: MediaView
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

const MediaGridItem = ({
  media,
  checked,
  onCheckedChange,
}: MediaGridItemProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const { t } = useTranslation()

  const handleToggle = useCallback(() => {
    onCheckedChange(!checked)
  }, [checked, onCheckedChange])

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: media.field_id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className="shadow-elevation-card-rest hover:shadow-elevation-card-hover focus-visible:shadow-borders-focus bg-ui-bg-subtle-hover group relative aspect-square h-auto max-w-full overflow-hidden rounded-lg outline-none"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {media.isThumbnail && (
        <div className="absolute left-2 top-2">
          <Tooltip content={t("products.media.thumbnailTooltip")}>
            <ThumbnailBadge />
          </Tooltip>
        </div>
      )}
      <div
        className={clx(
          "transition-fg absolute right-2 top-2 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 group-focus:opacity-100",
          {
            "opacity-100": checked,
          }
        )}
      >
        <div
          className={clx(
            "group relative inline-flex h-4 w-4 items-center justify-center outline-none "
          )}
        >
          <div
            className={clx(
              "text-ui-fg-on-inverted bg-ui-bg-component shadow-borders-base [&_path]:shadow-details-contrast-on-bg-interactive group-disabled:text-ui-fg-disabled group-disabled:!bg-ui-bg-disabled group-disabled:!shadow-borders-base transition-fg h-[14px] w-[14px] rounded-[3px]",
              {
                "bg-ui-bg-interactive group-hover:bg-ui-bg-interactive shadow-borders-interactive-with-shadow":
                  checked,
              }
            )}
          >
            {checked && (
              <div className="absolute inset-0">
                <CheckMini />
              </div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="bg-ui-bg-subtle-hover absolute inset-0 flex items-center justify-center"
          >
            <Spinner className="text-ui-fg-subtle animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      <img
        src={media.url}
        onLoad={() => setIsLoading(false)}
        alt=""
        className="size-full object-cover object-center"
      />
    </div>
  )
}
