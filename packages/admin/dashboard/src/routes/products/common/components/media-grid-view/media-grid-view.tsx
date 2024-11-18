import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
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
import { ThumbnailBadge } from "@medusajs/icons"
import { Checkbox, clx, Tooltip } from "@medusajs/ui"
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
  onSwapPositions: (callback: (items: MediaView[]) => MediaView[]) => void
  selection: Record<string, boolean>
  onCheckedChange: (id: string) => (value: boolean) => void
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
}

export const MediaGrid = ({
  media,
  onSwapPositions,
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

    if (active.id !== over?.id) {
      onSwapPositions((items) => {
        const oldIndex = items.findIndex((item) => item.field_id === active.id)
        const newIndex = items.findIndex((item) => item.field_id === over?.id)

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
          <SortableContext
            items={media.map((m) => m.field_id)}
            strategy={rectSortingStrategy}
          >
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
          <DragOverlay dropAnimation={dropAnimationConfig}>
            {activeId ? (
              <MediaGridItemOverlay
                media={media.find((m) => m.field_id === activeId)!}
                checked={
                  !!selection[media.find((m) => m.field_id === activeId)!.id!]
                }
              />
            ) : null}
          </DragOverlay>
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
  const { t } = useTranslation()

  const handleToggle = useCallback(
    (value: boolean) => {
      console.log("value", value)
      onCheckedChange(value)
    },
    [onCheckedChange]
  )

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
    >
      {media.isThumbnail && (
        <div className="absolute left-2 top-2">
          <Tooltip content={t("products.media.thumbnailTooltip")}>
            <ThumbnailBadge />
          </Tooltip>
        </div>
      )}
      <div
        className="absolute inset-0 outline-none"
        {...attributes}
        {...listeners}
      />
      <div
        className={clx("transition-fg absolute right-2 top-2 opacity-0", {
          "group-focus-within:opacity-100 group-hover:opacity-100 group-focus:opacity-100":
            !isDragging && !checked,
          "opacity-100": checked,
        })}
      >
        <Checkbox
          onClick={(e) => {
            e.stopPropagation()
          }}
          checked={checked}
          onCheckedChange={handleToggle}
        />
      </div>
      <img
        src={media.url}
        alt=""
        className="size-full object-cover object-center"
      />
    </div>
  )
}

export const MediaGridItemOverlay = ({
  media,
  checked,
}: {
  media: MediaView
  checked: boolean
}) => {
  return (
    <div className="shadow-elevation-card-rest hover:shadow-elevation-card-hover focus-visible:shadow-borders-focus bg-ui-bg-subtle-hover group relative aspect-square h-auto max-w-full overflow-hidden rounded-lg outline-none">
      {media.isThumbnail && (
        <div className="absolute left-2 top-2">
          <ThumbnailBadge />
        </div>
      )}
      <div
        className={clx("transition-fg absolute right-2 top-2 opacity-0", {
          "opacity-100": checked,
        })}
      >
        <Checkbox checked={checked} />
      </div>
      <img
        src={media.url}
        alt=""
        className="size-full object-cover object-center"
      />
    </div>
  )
}
